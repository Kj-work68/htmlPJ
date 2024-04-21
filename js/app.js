    var form = document.getElementById("myForm"),
        imgInput = document.querySelector(".img"),
        file = document.getElementById("imgInput"),
        userName = document.getElementById("name"),
        age = document.getElementById("age"),
        city = document.getElementById("city"),
        email = document.getElementById("email"),
        phone = document.getElementById("phone"),
        post = document.getElementById("post"),
        stdate = document.getElementById("stdate"),
        submitBtn = document.querySelector(".submit"),
        userInfo = document.getElementById("data"), ///<tbody id="data">
        model = document.getElementById("userForm"),
        modelTitle = document.querySelector("#userForm .modal-title")

    let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

    let isEdit = false, editId
    showInfo()

    file.onchange = function(){
        if(file.files[0].size < 1000000){ // 1MB = 1000000
            var fileReader = new FileReader();

            fileReader.onload = function(e){
                imgUrl = e.target.result
                imgInput.src = imgUrl
            }

            fileReader.readAsDataURL(file.files[0])
        }
        else{
            alert("This file is too large!")
        }
    }

    function showInfo(){
        document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
        getData.forEach((element, index) =>{
            let createElement = `<tr class="employeeDetails">
                <td>${index+1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.employeeName}</td>
                <td>${element.employeeAge}</td>
                <td>${element.employeeCity}</td>
                <td>${element.employeeEmail}</td>
                <td>${element.employeePhone}</td>
                <td>${element.employeePost}</td>
                <td>${element.startDate}</td>
                <td>${index+1}</td>

                <td><button class="btn btn-success" onclick="readInfo('${element.picture}',
                '${element.employeeName}','${element.employeeAge}','${element.employeeCity}',
                '${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.startDate}')" data-bs-toggle="modal"
                data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index},'${element.picture}',
                '${element.employeeName}','${element.employeeAge}','${element.employeeCity}',
                '${element.employeeEmail}','${element.employeePhone}','${element.employeePost}','${element.startDate}')"data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pen"></i></button>
                <button class="btn btn-danger" onclick="delateInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
            </tr>`

            userInfo.innerHTML += createElement

        })
    }
    showInfo()

    function readInfo(pic, name, age, city, email, phone, post, stdate){
        document.querySelector('.showImg').src = pic,
        document.querySelector('#showName').value = name,
        document.querySelector('#showAge').value = age,
        document.querySelector('#showCity').value = city,
        document.querySelector('#showEmail').value = email,
        document.querySelector('#showPhone').value = phone,
        document.querySelector('#showPost').value = post,
        document.querySelector('#showstdate').value = stdate


    }

    function delateInfo(index){
        if(confirm("Are you sure want to delate?")){
            getData.splice(index, 1)
            localStorage.getItem("userProfile", JSON.stringify(getData))
            showInfo()
        }
        
    }

    form.addEventListener('submit', (e)=>{
        e.preventDefault()

        const information = {
            picture: imgInput.src == undefined ? "./img/user.png" : imgInput.src,
            employeeName: userName.value,
            employeeAge: age.value,
            employeeCity: city.value,
            employeeEmail: email.value,
            employeePhone: phone.value,
            employeePost: post.value,
            startDate: stdate.value
        }

        if(!isEdit){
            getData.push(information)

        }else{
            isEdit = false
            getData[editId] = information
        }

        localStorage.setItem('userProfile', JSON.stringify(getData))

        submitBtn.innerText = "Submit"
        modalTitle.innerHTML = "Fill the Form"

        showInfo()

        form.reset()

        imgInput.src = "./img/user.png"
        model.style.display = "none"
        document.querySelector(".model-backdrop").remove()

    })
