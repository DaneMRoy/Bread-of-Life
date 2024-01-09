<template>
    <div>
        <h1> Total Served: </h1>
        <div v-for="dist in Dists" :key="dist.id">
            <h1>{{ dist.total }} </h1>    <!-- This allows the endpoint to viewed by pulling it in from the API -->
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                Dists: [] 
            }
            
        },
        created() {
            let apiURL = `http://localhost:3000/get_ih_by_distid/${this.$route.params.id}`;
            axios.get(apiURL).then(res => {
                this.Dists = res.data;
            }).catch(error => {
                console.log(error)
            });
        }
    }
</script>
