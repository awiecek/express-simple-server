const axios = require("axios");
const express = require("express");
const colors = require("colors/safe");

const server = express();
const PORT = process.env.PORT || 3300;

server.use(express.static("public"));

server.get("/", (_req, res) => {
  res.send("Hello Express!");
});

server.get("/fetch-wordpress-graphql", async (_req, res) => {
  const query = `
    query QueryPosts {
      posts {
        nodes {
          id
          content
          title
          slug
          featuredImage {
            node {
              mediaDetails {
                sizes {
                  sourceUrl
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await axios.post(process.env.GRAPHQL_API_URL, { query });
  res.send(response.data.data.posts.nodes);
});

server.get("/envs", (req, res) => {
  console.log(process.env);
  res.send("Envs displayed in logs!");
});

server.get("/ansi-logs", (req, res) => {
  console.log(colors.red("this is red"));
  console.log(colors.green("this is green"));
  console.log(colors.blue("this is blue"));
  console.log(colors.bgCyan("this is cyan bg"));
  console.log(colors.bgMagenta("this is magenta bg"));
  console.log(colors.bgYellow("this is yellow bg"));
  res.send("Ansi colors displayed in logs!");
});

server.listen(PORT, () => {
  console.log(`Application is listening at port ${PORT}`);
});
