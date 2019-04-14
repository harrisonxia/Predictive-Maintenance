def main():
    filepath = 'etldata.txt'
    arr = ""
    with open(filepath) as fp:  
       line = fp.readline()
       while line:
           # print(line)
           arr = arr+","+line.strip()
           line = fp.readline()
    print(arr)
    f = open("da.txt", "a")
    f.write(arr)
    f.close()
if __name__== "__main__":
  main()