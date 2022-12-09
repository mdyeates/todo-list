$(document).ready(function () {
  $("#btn").click(function () {
    var task = $("#todo-input").val();
    var toDoListEl = $("#todo-list");
    var toDoCount = $("li").length + 1;

    // stop blank entry
    if (task === "") {
      alert("You cannot enter a blank task");
    } else {
      // store todo to local storage
      var todos = JSON.parse(localStorage.getItem("todos")) || [];
      var todo = {
        task: task,
      };
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));

      // create todo
      $(toDoListEl).prepend("<li class='item'>" + task + " <button class='completed'>Completed</button>" + "</li>");
      $("#todo-input").val("");
      $(".item:first-child").hide().fadeIn("slow");
      $("#todo-count").text(toDoCount);

      // remove todo on button click
      $(".completed").click(function () {
        $(this)
          .closest("li")
          .fadeOut("slow", function () {
            $(this).closest("li").remove();

            localStorage.removeItem("todos");
          });
        // update todo count if todo is completed
        $("#todo-count").text((toDoCount -= 1));
        // disable button after click
        $(this).prop("disabled", true);
      });
    }
  });

  // add event listner for enter key
  $("#todo-input").keypress("keydown", function (event) {
    var enterKey = 13;
    if (event.keyCode === enterKey) {
      $("#btn").click();
    }
  });
  // UI allow todo's to be grabbed and sorted
  $("ul").sortable();

  // print todos from local storage
  function printToDos() {
    var todos = JSON.parse(localStorage.getItem("todos")) || [];

    var toDoListEl = $("#todo-list");

    todos.forEach((todo) => {
      $(toDoListEl).prepend("<li class='item'>" + todo + " <button class='completed'>Completed</button>" + "</li>");
    });

    // update todo count
    var toDoCount = $("li").length;
    $("#todo-count").text(toDoCount);

    // remove todo on button click
    $(".completed").click(function () {
      $(this)
        .closest("li")
        .fadeOut("slow", function () {
          $(this).closest("li").remove();
          localStorage.removeItem("todos");
        });

      // update todo count if todo is completed
      $("#todo-count").text((toDoCount -= 1));
    });
  }

  printToDos();
});
