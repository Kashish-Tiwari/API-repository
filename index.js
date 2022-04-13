const express= require("express")
const bodyParser=require("body-parser")
const mongoose= require("mongoose")

const app= express();
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost:27017/request-leave-db")

const leaveSchema={
    date: String,
    dropbox: String,
    text: String
}
const leaveRequest= new mongoose.model("leaveRequest", leaveSchema)

app.route("/leave-request")
 .get((req,res)=> {
     leaveRequest.find({},(err,foundIt)=> {
         if(err){
             console.log(err);
         }else{
             console.log(foundIt)
         }
     })

 })
  .delete((req,res)=> {
      leaveRequest.deleteMany({},(err,success)=> {
          if(err){
              console.log(err);
          }else{
              console.log(success, "successfully deleted the request leave");
          }
      })
  })

  .post((req,res)=> {
      const newleaveRequest= new leaveRequest({
      date: req.body.date,
      dropbox: req.body.dropbox,
      text:req.body.text
      })
      newleaveRequest.save(function(err,success) {
           if(err){
              console.log(err)
          }else{
              console.log("successfully created the leave request")
          }

      })
  })
  .put((req,res) => {
      leaveRequest.update({title:req.params.leave-request},{date:req.body.date, dropbox:req.body.dropbox, text:req.body.text},(err, success) => {
        if(err){
            console.log(err);
        }else{
            console.log("leave request updated successfully")
        }
      })
  })
  .patch((req,res) => {
      leaveRequest.updateOne({title:req.params.leave-request}, {date:req.body.date, text:req.body.text},(err,success) => {
          if(!err){
              console.log("successfully updated date and text in leave request")
          }
      })
  })


app.listen(5000,()=> {
    console.log("server started")
})