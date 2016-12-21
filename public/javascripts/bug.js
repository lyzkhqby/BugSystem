/**
 * Created by rotoosoft-d04 on 2016/12/20.
 */
$(document).ready(function () {
    addBug();
})

function addBug() {
    $('#add').click(function () {
        self.location='/bugs/add';
    });
}