const allowedOrigins = [
  "https://cecati13.edu.mx",
  //dev
  "https://dvnegrete.github.io/",
  "http://localhost:5501",
  undefined,
  //dev
];

export function cors(req, res, next) {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  }
}
