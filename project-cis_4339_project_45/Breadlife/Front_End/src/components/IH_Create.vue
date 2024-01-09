<template>
    <div>
        <h2>Add Visit</h2> <!--The add visit form is used to track the visits of the intakeID   -->
        <form v-on:submit.prevent="submitForm">    
            <div class="form-group">
                <label for="intakeID">Intake ID </label>     <!--The showcases the intakeID that has been params over from the intake view   -->
                <input type="number" class="form-control" id="IntakeID" v-model="form.intakeID">
            </div>

            <div class="form-group">
                <label>Choose Distribution</label>
                <div id="">
                    <select class="form-control"  v-model="form.selected" >  <!--This code allows for the drop down to populated from the distrubtion get api endpoint   -->
                        <option :selected="true">Choose Event</option>
                        <option v-for="events in Events" v-bind:value ="[form.distID = events.distID, form.type = events.type,form.location = events.location ,form.date = events.date]"  :key="events.distID" required> <!-- This code allows the binding of the api get to go into the  form  as data   -->
                        {{ events.distID}} {{ events.type}}  {{ events.location}} {{ events.date}} <!-- This code is responsible for what is seen in the drop down selection box  -->
                        </option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <button @click="isShow = !isShow" class="btn btn-primary " v-if="!isShow">Submit</button>
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
            Events:[], 
            form: {
                intakeID: this.$route.params.id, //this is how the intake ID is help pulled over from the intake view, that way it is prefilled and the user does not need to type it in 
            },
            selected: ""
        }
    },
    created() {
            let apiURL = 'http://localhost:3000/dists'; // this allows the distrubution endpoint to get pulled in from the api to be used in the dropdown form
            axios.get(apiURL).then(res => {
                this.Events = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
   methods:{
        submitForm(){
            axios.post('http://localhost:3000/post_ih', this.form) // this code will allow the form to be posted to the Intake History, with using the intake ID it will allow to track visits
                 .then(() => {
    alert('Form was submitted successfully') 
  })       
        }
    }
}
</script>
