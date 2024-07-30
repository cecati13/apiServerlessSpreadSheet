/**
 *
 * @param {Object[]} nameFiles - Urls of Bynary Files save
 * @param {Object} body - req.body
 * @returns {Object} merge both objects
 */
export const mergeUrlsAndBody = (nameFiles, body) => {
  let merge = { ...body };
  nameFiles.forEach((item) => {
    const [key] = Object.keys(item);
    const value = { [key]: item[key] };
    merge = { ...merge, ...value };
  });
  return merge;
};
