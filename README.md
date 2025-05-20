# VisionCalc
VisionCalc is a web app that lets users draw digits and math operators, recognizes them using a scikit-learn model trained on load_digits() and custom images, and evaluates the expression. Built with React.js (frontend) and Flask (backend) for real-time digit recognition.

# Team Members:
Sanjayazhagan<br>
Gokul Krishna Balaji<br>
Neppali Puneeth Kumar<br>

# Solution Overview
1️. User draws a mathematical expression (e.g., "12 + [4 * 3]") on the canvas.<br>
2️. Image is preprocessed (converted to grayscale).<br>
3️. Image is sent to the Flask backend, where the Machine Learning model (Random Forest) predicts individual characters.<br>
4️. Predicted characters are converted into a valid mathematical expression (e.g., 12 + [4 * 3]).<br>
5️. The expression is evaluated, and the result is computed.<br>
6️. The final result is sent back to the frontend and displayed to the user.<br>
