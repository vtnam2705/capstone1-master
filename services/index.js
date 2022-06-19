function Services() {

    this.getListProductApi = function (){
        return axios({
            url: "https://62973de08d77ad6f75fdf00d.mockapi.io/product",
            method:"GET"
        });
    };
}