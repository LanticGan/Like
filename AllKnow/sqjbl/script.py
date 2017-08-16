import os

f = open("data.txt",'r')
txt = ""
section = ""
titile = ""
# for i in f.readlines():
#   txt = txt + "<p>" + i + "</p>"
# print(txt)
Flist = f.readlines()
for i in range(0,len(Flist)):
    if(i==0):
        title = Flist[i]
        txt +=  """ <!doctype html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, user-scalable=no">
        
        <title>申请及办理</title>
        <link rel="stylesheet" href="../../../css/reset.css">
        <link rel="stylesheet" href="../../../css/weui.min.css"> 
    </head>
    
    <body ontouchstart>
    <div id="container" style="margin-bottom:1em;">
        <div class="page__bd">
        <article class="weui-article">
            <h1 style="border-bottom:1px solid #efefef; padding-bottom:10px; font-weight:bold">""" + Flist[i] + "</h1>"
    else:
        if(Flist[i][0] == "b"):
            string = "<p style=\"font-weight:bold\">" + Flist[i].strip("b") + "</p>"
        else:
            string =  "<p>" + Flist[i] + "</p>"
        section += string

txt = txt + section + """ 
</section>
            </section>
        </article>



    </div>
    <footer style="display:flex; justify-content: center; border-top: 1px solid #efefef; padding-top:10px;">
        <a href="../../allknow.html">
            <img src="../../res/icon/home.png" alt="home" style="height:28px;width:28px;vertical-align: middle;display:inline-block">
            <span style="font-size: 14px;vertical-align: middle;color:#9b9b9b;"> 回目录</span>
        </a>
    </footer>
</div>
    
    </body>
</html>
"""


#   if(i % 4 == 0):
#       txt = txt+ "</tr>"  + "<tr>" + "<td>" + Flist[i] + "</td>" 
#   else:
#       txt = txt + "<td>" + Flist[i] + "</td>"
f.close()
os.mkdir("bb")
wf = open("bb/" + "index.html", "w",encoding= 'utf8')
wf.write(txt)
wf.close();
print(txt)