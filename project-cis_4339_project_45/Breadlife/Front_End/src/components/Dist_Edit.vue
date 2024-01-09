<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Update Distribution</h3>   
            <form @submit.prevent="handleUpdateForm"> <!-- This button uses the 'handleUPdateForm method to submit the data -->
                 
                <div class="form-group">                    <!-- date field for date of event -->
                    <label for="location">Date</label>  
                    <input type="date" class="form-control" id="date" placeholder="MM/DD/YYYY" v-model="form.date" required> <!-- required validation -->
                </div>

                 <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" class="form-control" id="date" placeholder="Location"  v-model="form.location" required> <!-- required validation -->
                </div>
                    <div class="form-group">
                    <label for="refer">Type</label>    <!-- Drop down box with the proper distrbution values  -->
                    <select name="type" class="form-control" id="type" v-model="form.type" required>  <!-- required validation -->
                        <option value="Food">Food</option>
                        <option value="Money">Money</option>
                        <option value="Housing">Housing</option>
                        <option value="Covid Shot">Covid Shot</option>
                        <option value="Child Care">Child Care</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-primary">Submit</button>   <!-- The submit button that will push the form  -->
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            form: { }
        }
    },
    created() {
        let apiURL = `http://localhost:3000/dist/${this.$route.params.id}`;  // takes the param from distView and inserts it into GET endpoint

        axios.get(apiURL).then((res) => {
            this.form = res.data;
        })
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:3000/dist/${this.$route.params.id}`;  // takes the distID params from distView and inserts it into PUT endpoint url
            axios.put(apiURL, this.form).then((res) => {                         // takes the 'form' and sends it to endpoint so the data can be updated
                console.log(res)
                this.$router.push('/distView') // Allows the page to pushed to the distrubtion view after submit is pressed
            }).catch(error => {
                console.log(error)
            });
        }
    }
}
</script>