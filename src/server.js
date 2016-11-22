import twit from "twit";
import express from "express";
import bodyParser from "body-parser";
import { home, notFound } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

app
  .get( "/", (req, res) => {
    if ( req.status >= 400 ) {
      notFound( req, res );
    }
    home( req, res );
  })
  .listen( port, () => {
    console.log( `App serving on Port: ${port}` );
  });