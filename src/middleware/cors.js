const allowedOrigins = [
  "https://cecati13.edu.mx",
  //dev
  "http://localhost:5501",
  undefined,
];

export function cors(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Allow", "GET, POST");
    next();
  }
}
