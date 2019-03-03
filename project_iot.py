import sys
assert sys.version_info >= (3, 5) # make sure we have Python 3.5+

from pyspark.sql import SparkSession, functions, types
spark = SparkSession.builder.appName('weather train').getOrCreate()
spark.sparkContext.setLogLevel('WARN')
assert spark.version >= '2.3' # make sure we have Spark 2.3+

from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler, SQLTransformer
from pyspark.ml.regression import GBTRegressor
from pyspark.ml.evaluation import RegressionEvaluator
from datetime import datetime
from pyspark.sql.functions import udf
from pyspark.sql import types

df_features = spark.read.csv('feature.csv', sep = ',', header = True)
df_train_label = spark.read.csv('train_label.csv', sep = ',', header = True)

def strpDate_features(row):
	return datetime.strptime(row, '%Y/%m/%d')

def strpDate_trainlabel(row):
	return datetime.strptime(row, '%d/%m/%Y')

udf_strpTime_features = udf(strpDate_features, types.DateType())
udf_strpTime_trainlabel = udf(strpDate_trainlabel, types.DateType())

df_features = df_features.withColumn('realdate', udf_strpTime_features(df_features['date']))
df_train_label = df_train_label.withColumn('realdate', 
	udf_strpTime_trainlabel(df_train_label['date']))

#df_new = df_train_label.join(df_features, 'realdate')
print(df_features.describe())


