/**
 * This express service renders pages based on input URLs and search for the content templates that matches the input
 * @author Maria Arenas
 */
import express from "express";
import fs from "fs";
import md from "markdown-it";
import path from "path";
import { fileURLToPath } from "url";

export const app = express();

// variables to read the path to the content directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainPath = __dirname + "/content";

const port = 3000;
const errorMessage = "<h1>404! Page not found</h1>";

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

/**
 * GET page. This method renders a page based on a matching input url that searches for a template.
 * It returns 404 if template has not been found.
 */
app.get("/*", (req, res) => {
  var url = req.url;
  if (fs.existsSync(mainPath + url)) {
    new Promise((resolve, reject) => {
      fs.readFile(mainPath + url + "/index.md", "utf8", (err, data) => {
        resolve(data);
      });
    })
      .then((data) => {
        const mdToHtml = new md().render(data);
        res.render("pages/template", {
          content: mdToHtml,
        });
      })
      .catch((error) => {
        res.status(404).send(errorMessage);
      });
  } else {
    res.status(404).send(errorMessage);
  }
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
