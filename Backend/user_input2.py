from sklearn.datasets import load_digits
from PIL import Image
import numpy as np
from sklearn import svm
from sklearn.model_selection import train_test_split
import joblib
import numexpr as ne

def output():
    model = joblib.load("model_all.pkl")

    image = Image.open("drawing.png").convert("L")

    array = np.array(image)

    array_2d = np.array(array)

    array_1d = array_2d.flatten().astype(float)

    return str(model.predict([array_1d])[0])

def computation():
    current_output = output()  # Call output() once and store the result

    if current_output != '=':
        with open("expression.txt", "a") as file:  # Open in append mode
            file.write(current_output)  # Write the stored output
        
        # Return the content of expression.txt
        with open("expression.txt", "r") as file:
            return file.read().strip()
    else:
        # Read and evaluate the expression
        with open("expression.txt", "r") as file:
            exp = file.read().strip()
            
            # Basic validation
            if not exp:
                return "No expression to evaluate"
            
            try:
                # Simple check for valid characters (customize as needed)
                allowed_chars = set('0123456789+-*/.()[] ')
                if not all(c in allowed_chars for c in exp):
                    return "Invalid characters in expression"
                
                exp = exp.replace('[', '(').replace(']', ')')

                result = ne.evaluate(exp)
                open("expression.txt", "w").close()
                return f"Result: {result}" # Print the result
                
                # Clear the file after printing the result
                
                
            except Exception as e:
                open("expression.txt", "w").close()
                return f"Error evaluating expression: {str(e)}"
def onReload():
    open("expression.txt", "w").close()



print(computation())