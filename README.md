# End-to-End Solution For IoT devices Predictive Maintenance and Management

## Goal
- Our ultimate goal is to build a non-exclusive end-to-end IoT device predictive maintenance and management solution, from on-field devices all the way to a web console. The solution should be easy-to-use, flexible for all devices, and scalable to accommodate future growth.

## Live
- <https://www.devxia.com/crouching_tigers> 

## Video Presentation
- <https://youtu.be/beyPiOhJXwg>

## Report
- `report.pdf`

## Repository structure
- `code/iot_project.ipynb`: the main code for our project, including modules for:
  1. Data ETL/EDA
  2. Model Training
  3. Model Testing
  4. Anomaly Detection Fitting/Testing
  5. Plot
- `code/project_iot.py`: old models using pyspark machine learning pipeline and DecisionTree classification algorithm for the project. Discarded in the latest modules
- `code/LinearRegression.py/LogisticRegression.py/options_regression.py`: similar to project_iot.py, but using different regression algorithms
- `code/AnomalyDetection.ipynb`: Test code for anomaly detection using different dataset
- `code/FeatureSelection.ipynb`: Test code for feature selection using different dataset
- `model`: saved model exported from Tensorflow, deployed on Google Cloud Machine Learning Engine.
- `dataset/demo_data.zip`: The raw dataset we actually used for final result.
- `web/node_server`: Proof of concept Node.js server that simulate on-field device uptime and heartbeat
    * See more instruction at `web/node_server/README.md`
    * Deployed on AWS
    * Example REST API endpoint: `GET` http://ec2-18-236-179-13.us-west-2.compute.amazonaws.com:5000/machines
- `web/frontend`: Proof of concept React frontend dashboard
    * See more instruction at `web/frontend/README.md`
    * Deployed on https://www.devxia.com/crouching_tigers
    * Template starter by Creative Tim (https://www.creative-tim.com)
    * Commnunicate with model deployed on Google Cloud Machine Learning Engine and Node.js server on AWS.