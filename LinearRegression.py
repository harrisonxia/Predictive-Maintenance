import sys

assert sys.version_info >= (3, 5)  # make sure we have Python 3.5+
from pyspark.sql import SparkSession, functions, types
from pyspark.sql.functions import udf
from pyspark.ml.regression import LinearRegression,RandomForestRegressor,GeneralizedLinearRegression
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml import Pipeline
from pyspark.ml.feature import VectorAssembler
from datetime import datetime

spark = SparkSession.builder.appName('regression').getOrCreate()
spark.sparkContext.setLogLevel('WARN')
assert spark.version >= '2.3'  # make sure we have Spark 2.3+
from pyspark.ml import pipeline
feature_schema = types.StructType([
	    types.StructField('date', types.StringType(), False),
        types.StructField('e1', types.IntegerType()),
        types.StructField('e2', types.IntegerType()),
        types.StructField('e3', types.IntegerType()),
        types.StructField('e4', types.IntegerType()),
        types.StructField('e5', types.IntegerType()),
        types.StructField('e6', types.IntegerType()),
        types.StructField('e7', types.IntegerType()),
        types.StructField('e8', types.IntegerType()),
        types.StructField('e9', types.IntegerType()),
        types.StructField('e10', types.IntegerType()),
        types.StructField('e11', types.IntegerType()),
        types.StructField('e12', types.IntegerType()),
        types.StructField('e13', types.IntegerType()),
        types.StructField('e14', types.IntegerType()),
        types.StructField('e15', types.IntegerType()),
        types.StructField('e16', types.IntegerType()),
        types.StructField('e17', types.IntegerType()),
        types.StructField('e18', types.IntegerType()),
        types.StructField('e19', types.IntegerType()),
        types.StructField('e20', types.IntegerType()),
        types.StructField('e21', types.IntegerType()),
        types.StructField('e22', types.IntegerType()),
        types.StructField('e23', types.IntegerType()),
        types.StructField('e24', types.IntegerType()),
        types.StructField('e25', types.IntegerType()),
        types.StructField('e26', types.IntegerType()),
        types.StructField('e1max', types.IntegerType()),
        types.StructField('e2max', types.IntegerType()),
        types.StructField('e3max', types.IntegerType()),
        types.StructField('e4max', types.IntegerType()),
        types.StructField('e5max', types.IntegerType()),
        types.StructField('e6max', types.IntegerType()),
        types.StructField('e7max', types.IntegerType()),
        types.StructField('e8max', types.IntegerType()),
        types.StructField('e9max', types.IntegerType()),
        types.StructField('e10max', types.IntegerType()),
        types.StructField('e11max', types.IntegerType()),
        types.StructField('e12max', types.IntegerType()),
        types.StructField('e13max', types.IntegerType()),
        types.StructField('e14max', types.IntegerType()),
        types.StructField('e15max', types.IntegerType()),
        types.StructField('e16max', types.IntegerType()),
        types.StructField('e17max', types.IntegerType()),
        types.StructField('e18max', types.IntegerType()),
        types.StructField('e19max', types.IntegerType()),
        types.StructField('e20max', types.IntegerType()),
        types.StructField('e21max', types.IntegerType()),
        types.StructField('e22max', types.IntegerType()),
        types.StructField('e23max', types.IntegerType()),
        types.StructField('e24max', types.IntegerType()),
        types.StructField('e25max', types.IntegerType()),
        types.StructField('e26max', types.IntegerType()),
        types.StructField('e1min', types.IntegerType()),
        types.StructField('e2min', types.IntegerType()),
        types.StructField('e3min', types.IntegerType()),
        types.StructField('e4min', types.IntegerType()),
        types.StructField('e5min', types.IntegerType()),
        types.StructField('e6min', types.IntegerType()),
        types.StructField('e7min', types.IntegerType()),
        types.StructField('e8min', types.IntegerType()),
        types.StructField('e9min', types.IntegerType()),
        types.StructField('e10min', types.IntegerType()),
        types.StructField('e11min', types.IntegerType()),
        types.StructField('e12min', types.IntegerType()),
        types.StructField('e13min', types.IntegerType()),
        types.StructField('e14min', types.IntegerType()),
        types.StructField('e15min', types.IntegerType()),
        types.StructField('e16min', types.IntegerType()),
        types.StructField('e17min', types.IntegerType()),
        types.StructField('e18min', types.IntegerType()),
        types.StructField('e19min', types.IntegerType()),
        types.StructField('e20min', types.IntegerType()),
        types.StructField('e21min', types.IntegerType()),
        types.StructField('e22min', types.IntegerType()),
        types.StructField('e23min', types.IntegerType()),
        types.StructField('e24min', types.IntegerType()),
        types.StructField('e25min', types.IntegerType()),
        types.StructField('e26min', types.IntegerType()),
        types.StructField('e1mean', types.FloatType()),
        types.StructField('e2mean', types.FloatType()),
        types.StructField('e3mean', types.FloatType()),
        types.StructField('e4mean', types.FloatType()),
        types.StructField('e5mean', types.FloatType()),
        types.StructField('e6mean', types.FloatType()),
        types.StructField('e7mean', types.FloatType()),
        types.StructField('e8mean', types.FloatType()),
        types.StructField('e9mean', types.FloatType()),
        types.StructField('e10mean', types.FloatType()),
        types.StructField('e11mean', types.FloatType()),
        types.StructField('e12mean', types.FloatType()),
        types.StructField('e13mean', types.FloatType()),
        types.StructField('e14mean', types.FloatType()),
        types.StructField('e15mean', types.FloatType()),
        types.StructField('e16mean', types.FloatType()),
        types.StructField('e17mean', types.FloatType()),
        types.StructField('e18mean', types.FloatType()),
        types.StructField('e19mean', types.FloatType()),
        types.StructField('e20mean', types.FloatType()),
        types.StructField('e21mean', types.FloatType()),
        types.StructField('e22mean', types.FloatType()),
        types.StructField('e23mean', types.FloatType()),
        types.StructField('e24mean', types.FloatType()),
        types.StructField('e25mean', types.FloatType()),
        types.StructField('e26mean', types.FloatType()),
        types.StructField('e1std', types.FloatType()),
        types.StructField('e2std', types.FloatType()),
        types.StructField('e3std', types.FloatType()),
        types.StructField('e4std', types.FloatType()),
        types.StructField('e5std', types.FloatType()),
        types.StructField('e6std', types.FloatType()),
        types.StructField('e7std', types.FloatType()),
        types.StructField('e8std', types.FloatType()),
        types.StructField('e9std', types.FloatType()),
        types.StructField('e10std', types.FloatType()),
        types.StructField('e11std', types.FloatType()),
        types.StructField('e12std', types.FloatType()),
        types.StructField('e13std', types.FloatType()),
        types.StructField('e14std', types.FloatType()),
        types.StructField('e15std', types.FloatType()),
        types.StructField('e16std', types.FloatType()),
        types.StructField('e17std', types.FloatType()),
        types.StructField('e18std', types.FloatType()),
        types.StructField('e19std', types.FloatType()),
        types.StructField('e20std', types.FloatType()),
        types.StructField('e21std', types.FloatType()),
        types.StructField('e22std', types.FloatType()),
        types.StructField('e23std', types.FloatType()),
        types.StructField('e24std', types.FloatType()),
        types.StructField('e25std', types.FloatType()),
        types.StructField('e26std', types.FloatType()),

])
train_label_schema = types.StructType([
	types.StructField('date', types.StringType()),
	types.StructField('label', types.IntegerType()),
	])
df_features = spark.read.csv('feature.csv', sep = ',', header = True, schema = feature_schema)
df_train_label = spark.read.csv('train_label.csv', sep = ',', header = True,
	schema = train_label_schema)
def strpDate_features(row):
	if row == None:
		return None
	return datetime.toordinal(datetime.strptime(row, '%Y/%m/%d'))

def strpDate_trainlabel(row):
	return datetime.toordinal(datetime.strptime(row, '%d/%m/%Y'))

udf_strpTime_features = udf(strpDate_features, types.IntegerType())
udf_strpTime_trainlabel = udf(strpDate_trainlabel, types.IntegerType())

df_features = df_features.withColumn('realdate',
	udf_strpTime_features(df_features['date'])).drop('date')
df_train_label = df_train_label.withColumn('realdate',
	udf_strpTime_trainlabel(df_train_label['date'])).drop('date')

df_new = df_train_label.join(df_features, 'realdate')
df_new = df_new.na.fill(0.0)

train, validation = df_new.randomSplit([0.80, 0.20])

assembler = VectorAssembler(
	inputCols = ['realdate', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11', 'e12',
	'e13', 'e14', 'e15', 'e16', 'e17', 'e18', 'e19', 'e20', 'e21', 'e22', 'e23', 'e24', 'e25', 'e26'],
	outputCol = 'features')

lr=LinearRegression(featuresCol='features',labelCol='label')
pipeline=Pipeline(stages=[assembler,lr])

model = pipeline.fit(train)
prediction=model.transform(validation)
evaluator=RegressionEvaluator(predictionCol='prediction')
res=evaluator.evaluate(prediction,{evaluator.metricName:'mse'})
print(res)


