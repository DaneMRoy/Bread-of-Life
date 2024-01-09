<template>
    <div>
            <h2> Add New Distribution </h2>  <!-- The form to post the distrubution with the proper models -->
            <form v-on:submit.prevent="submitForm">   
                <div class="form-group"> 
                    <label for="distID">Distribution ID </label>        <!-- Where the distID is entered and required validation -->
                    <input type="number" class="form-control" id="distID"  placeholder="Distrubution ID " v-model="form.distID" required>
                </div>
                <div class="form-group">
                    <label for="location">Date</label>          <!-- Date field that had the user select a date of the event -->
                    <input type="date" class="form-control" id="date" placeholder="MM/DD/YYYY" v-model="form.date" required>  <!-- input type date and required validation -->
                </div>

                 <div class="form-group">
                    <label for="location">Location</label>      <!-- Location field for the location of the event -->
                    <input type="text" class="form-control" id="date" placeholder="Location" v-model="form.location" required>  <!-- required validation -->
                </div>
                <div class="form-group">             <!-- Drop down that allows easy selection for the type of service-->
                    <label for="refer">Type</label>
                    <select name="type" class="form-control" id="type" v-model="form.type" required> <!-- required validation --> 
                        <option value="Food">Food</option>
                        <option value="Money">Money</option>
                        <option value="Housing">Housing</option>
                        <option value="Covid Shot">Covid Shot</option>
                        <option value="Child Care">Child Care</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-primary">Submit</button>
                </div>
            </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'form',
    data(){
        return{
            form: {           // takes in the form vmodel that goes inline with the endpoint post fields 
                distID: '',  
                location: '',
                type: '',
                date: ''
            }
        }
    },
   methods:{
        submitForm(){
            axios.post('http://localhost:3000/dist', this.form)  // uses the endpint to take the dist form and post it 
                 .then(() => {
    alert('Form was submitted successfully')
  })        
        }
    }
}
</script>
