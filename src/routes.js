export const home = (req, res) => {
  const headers = req.headers;
  const method = req.method;
  const uri = req.url;

  res.setHeader( "Content-Type", "text/html" );
  res.end( `goalbookTEACH Twitterbot Status: Active` );
}

export const notFound = (req, res) => {
  res.status = 404;
  res.end( `404: Not Found` );
}