import os
import logging
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from user_input2 import computation,onReload  # Import the function

app = Flask(__name__)
CORS(app)  # Allow React to communicate with Flask

# Save the uploaded image in the same directory as Main.py
DEFAULT_IMAGE_PATH = os.path.join(os.getcwd(), "drawing.png")

# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route('/api/hello', methods=['GET'])
def call_function():
    result = onReload()
    return jsonify(result)  # Convert Python dictionary to JSON


@app.route("/upload", methods=["POST"])
def upload_file():
    logging.debug("Received a file upload request.")

    if "file" not in request.files:
        return jsonify({"message": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"message": "No selected file"}), 400

    # Save the file as "drawing.png" in the same directory
    file.save(DEFAULT_IMAGE_PATH)
    logging.info(f"File saved at: {DEFAULT_IMAGE_PATH}")

    # Wait until the file is fully written (max 1 second)
    for _ in range(10):  
        if os.path.exists(DEFAULT_IMAGE_PATH):
            break
        time.sleep(0.1)  # Wait for 100ms

    try:
        logging.debug("Calling output() to process the image.")
        result = computation()  # Convert result to Python int
    except Exception as e:
        logging.error(f"Error in output(): {e}")
        return jsonify({"message": "Error processing image", "error": str(e)}), 500

    return jsonify({"message": "File saved successfully", "processing_result": result}), 200

if __name__ == "__main__":
    logging.info("Starting Flask application.")
    app.run(debug=True)
