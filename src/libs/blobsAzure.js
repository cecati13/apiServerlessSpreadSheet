import { BlobServiceClient } from "@azure/storage-blob";
import { notFound } from "@hapi/boom";
import { config } from "../config/index.js";

const blobServices = BlobServiceClient.fromConnectionString(
  config.azureStorageConnection
);

export async function listBlobs(obj) {
  const list = [];
  const containerClient = blobServices.getContainerClient(obj.container);
  for await (const blob of containerClient.listBlobsFlat()) {
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
    const obj = {
      name: blob.name,
      url: tempBlockBlobClient.url,
    };
    list.push(obj);
  }
  return list;
}

/**
 * 
 * @param {Object} obj - Configuration for upload
 * @param {Buffer} obj.file - File on format buffer
 * @param {String} obj.name - Name to save
 * @param {String} obj.container - Name of container
 * @returns {String} Url of Blob
 */
export async function uploadBlobStorage(obj) {
  //obj = file, name, container
  try {
    const { buffer } = obj.file;
    const containerClient = blobServices.getContainerClient(obj.container);
    await containerClient.getBlockBlobClient(obj.name).uploadData(buffer);
    const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
    return blockBlobClient.url;
  } catch (error) {
    console.error(error.message);
    return { message: error.message };
  }
}

//const container = "comprobantes";

export async function getBlobStorage(obj) {
  try {
    const containerClient = blobServices.getContainerClient(obj.container);
    const blockBlobClient = containerClient.getBlockBlobClient(obj.name);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    const downloaded = await streamToBuffer(
      downloadBlockBlobResponse.readableStreamBody
    );
    return downloaded;
  } catch (error) {
    throw notFound(error);
  }
}

export async function deleteBlob(blob) {
  const options = {
    deleteSnapshots: "include",
  };
  const containerClient = blobServices.getContainerClient(blob.container);
  const fileBlob = await containerClient
    .getBlockBlobClient(blob.name)
    .deleteIfExists(options);
  return fileBlob;
}

async function streamToBuffer(readable) {
  readable.setEncoding("base64");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}
