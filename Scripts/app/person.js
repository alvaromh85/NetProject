$(document).on("ready", function () {
    $('#btnSearch').on('click', function () {
        GetPersonById($('#txtIdSearch').val());
    })
    $('#btnDelete').on('click', function () {
        DeletePersonById($('#txtIdSearch').val());
    })
    $('#btnUpdate').on('click', function () {
        var person = new Object();
        person.id = $('#txtIdSearch').val();
        person.firstname = $('#txtFirstName').val();
        person.lastname = $('#txtLastName').val();
        UpdatePerson(person.id, JSON.stringify(person));
    })
    $('#btnCreate').on('click', function () {
        var person = new Object();
        person.firstname = $('#txtFirstName').val();
        person.lastname = $('#txtLastName').val();
        CreatePerson(JSON.stringify(person));
    })
    GetAll();
})

//Get all persons
function GetAll() {
    var item = "";
    $('#tblList tbody').html('');
    $.getJSON('/api/person', function (data) {
        $.each(data, function (key, value) {
            item += "<tr><td>" + value.Id + "</td><td>" + value.FirstName + "</td><td>" + value.LastName + "</td></tr>";
        });
        $('#tblList tbody').append(item);
    });
};

//Get person by id
function GetPersonById(idPerson) {
    var url = '/api/person/' + idPerson;
    $.getJSON(url)
        .done(function (data) {
            $('#txtFirstName').val(data.FirstName);
            $('#txtLastName').val(data.LastName);
        })
        .fail(function (erro) { 
            ClearForm();
        });
};

//Delete person by id
function DeletePersonById(idPerson) {
    var url = '/api/person/' + idPerson;
    $.ajax({
        url: url,
        type: 'DELETE',
        contentType: "application/json;chartset=utf-8",
        statusCode: {
            200: function () {
                GetAll();
                ClearForm();
                alert('Person with id: ' + idPerson + ' was deleted');
            },
            404: function () {
                alert('Person with id: ' + idPerson + ' was not found');
            }
        }
    });
}

//Update person
function UpdatePerson(idPerson,person) {
    var url = '/api/person/' + idPerson;
    $.ajax({
        url: url,
        type: 'PUT',
        data: person,
        contentType: "application/json;chartset=utf-8",
        statusCode: {
            200: function () {
                GetAll();
                ClearForm();
                alert('Person with id: ' + idPerson + ' was updated');
            },
            404: function () {
                ClearForm();
                alert('Person with id: ' + idPerson + ' was not found');
            },
            400: function () {
                ClearForm();
                alert('Error');
            }
        }
    });
}

//Create a new person
function CreatePerson(person) {
    var url = '/api/person/';
    $.ajax({
        url: url,
        type: 'POST',
        data: person,
        contentType: "application/json;chartset=utf-8",
        statusCode: {
            201: function () {
                GetAll();
                ClearForm();
                alert('Person with id: ' + idPerson + ' was updated');
            },
            400: function () {
                ClearForm();
                alert('Error');
            }
        }
    });
}

//Clear form
function ClearForm() {
    $('#txtIdSearch').val('');
    $('#txtFirstName').val('');
    $('#txtLastName').val('');
}