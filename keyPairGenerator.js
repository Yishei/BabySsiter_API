const fs = require("fs");
const crypto = require("crypto");

const publicKeyPath = "public.pem";
const privateKeyPath = "private.pem";

// Function to generate a new key pair if one doesn't exist
function generateKeyPairIfNotExists() {
  if (!fs.existsSync(publicKeyPath) || !fs.existsSync(privateKeyPath)) {
    crypto.generateKeyPair(
      "rsa",
      {
        modulusLength: 2048,
      },
      (err, publicKey, privateKey) => {
        if (err) {
          console.error("Error generating key pair:", err);
          return;
        }

        // Save the public key in a file called `public.key`.
        fs.writeFileSync(
          publicKeyPath,
          publicKey.export({ type: "pkcs1", format: "pem" })
        );
        fs.writeFileSync(
          privateKeyPath,
          privateKey.export({ type: "pkcs1", format: "pem" })
        );

        console.log("Key pair created successfully!");
      }
    );
  }
}

module.exports = {
  generateKeyPairIfNotExists,
};
