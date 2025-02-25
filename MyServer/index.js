const http = require("http");

const server = http.createServer((req, res) => {
  console.log("Incoming request...");

  const path = req.url;
  console.log("Requested URL:", path);

  switch (path) {
    case "/":
      res.write =
        "<h1 style='color:blue; text-align:center;'>Welcome to the Home Page</h1>";
      res.end();
      break;
    case "/services":
      res.write =
        "<h1 style='color:green; text-align:center;'>Our Services</h1><p style='text-align:center;'>We provide top-notch solutions!</p>";
      res.end();
      break;
    case "/team":
      res.write =
        "<h1 style='color:purple; text-align:center;'>Meet Our Team</h1><p style='text-align:center;'>We have an amazing crew!</p>";
      res.end();
      break;
    case "/contact":
      res.write =
        "<h1 style='color:orange; text-align:center;'>Contact Us</h1><p style='text-align:center;'>Feel free to reach out!</p>";
      res.end();
      break;
    case "/about":
      res.write =
        "<h1 style='color:teal; text-align:center;'>About Us</h1><p style='text-align:center;'>Learn more about our mission and vision.</p>";
      res.end();
      break;
    case "/blog":
      res.write =
        "<h1 style='color:violet; text-align:center;'>Our Blog</h1><p style='text-align:center;'>Check out our latest articles and updates.</p>";
      res.end();
      break;
    case "/faq":
      res.write =
        "<h1 style='color:darkgreen; text-align:center;'>Frequently Asked Questions</h1><p style='text-align:center;'>Find answers to common questions here.</p>";
      res.end();
      break;
    default:
      res.write = res.end();
      "<h1 style='color:red; text-align:center;'>404 - Page Not Found</h1><p style='text-align:center;'>Oops! The page you are looking for does not exist.</p>";
  }
});

server.listen(8005, () =>
  console.log("Server is up and running on port 8005!")
);
