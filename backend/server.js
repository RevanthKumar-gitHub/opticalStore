const app = require("./app");
const PORT = process.env.PORT || 8001;



app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
