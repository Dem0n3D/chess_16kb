$(function () {

    $("#btn_login").click(e => {
        const login = $("input[name='login']").val();
        const password = $("input[name='password']").val();
        axios.get("/auth/salt", {params: {login: login}})
            .then(r => {
                const hash = dcodeIO.bcrypt.hashSync(password, r.data.salt);
                const response = dcodeIO.bcrypt.hashSync(hash, r.data.challenge);

                axios.post("/auth/login", {login, password, response, challenge: r.data.challenge})
            });
        return false;
    });

});
