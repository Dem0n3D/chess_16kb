import $ from 'jquery';
import 'jquery-ui-bundle';
import axios from 'axios';
import bcrypt from 'bcryptjs';


$(function () {

    $("#btn_login").click(e => {
        const login = $("input[name='login']").val();
        const password = $("input[name='password']").val();
        axios.get("/auth/salt", {params: {login: login}})
            .then(r => {
                const hash = bcrypt.hashSync(password, r.data.salt);
                const response = bcrypt.hashSync(hash, r.data.challenge);

                axios.post("/auth/login", {login, password, response, challenge: r.data.challenge})
            });
        return false;
    });

});
