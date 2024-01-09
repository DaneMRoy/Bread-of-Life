<template>


    <div class="row">
        <h3> Intake </h3>
        <router-link :to="{name: 'intakeCreate'} " class="btn btn-success">Add Intake</router-link>
       
        
        <div class="col-md-12">
            <table class="table table-striped">    <!-- This allows for the view of the intake table with the matching fields from the database -->
                <thead class="thead-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>How did you hear about our distribution?</th>
                        <th>Zip Code</th>
                        <th>COVID Vaccinated?</th>
                        <th>Want to recieve vaccine during distribution?</th>
                        <th>COVID Vaccine Preference</th>
                        <th>Additional supportive services?</th>
                        <th># Children in household</th>
                        <th>65+ in household?</th>
                        <th>Veteran?</th>
                        <th>Race</th>
                        <th>Intake ID</th>
                       
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="intake in Intakes" :key="intake.intakeID">
                        <td>{{ intake.firstName }}</td>
                        <td>{{ intake.lastName }}</td>
                        <td>{{ intake.phoneNumber }}</td>
                        <td>{{ intake.how_did_you_hear }}</td>
                        <td>{{ intake.zipCode}}</td>
                        <td>{{ intake.have_you_received_vaccine }}</td>
                        <td>{{ intake.would_you_like_vaccine }}</td>
                        <td>{{ intake.which_covid_vaccine}}</td>
                        <td>{{ intake.support_services }}</td>
                        <td>{{ intake.number_of_children }}</td>
                        <td>{{ intake.anyone_65 }}</td>
                        <td>{{ intake.veteran }}</td>
                        <td>{{ intake.race }}</td>
                        <td>{{ intake.intakeID}}</td>
                       
                        <td>
                            <!-- We included buttons on the view table to make it easier for the user to do certain tasks without having to look for it -->
                            <router-link :to="{name: 'ihCreate', params: { id: intake.intakeID }}" class="btn btn-primary btn-sm"> Add Visit</router-link>     <!-- The Button allows the page to be routed over to create intake form   -->
                            <router-link :to="{name: 'ihView', params: { id: intake.intakeID }}" class="btn btn-info btn-sm">Visit History</router-link>      <!-- We added the Visit History button on the view page to make easier to get to the specifc Intake History -->
                            <router-link :to="{name: 'intakeEdit', params: { id: intake.intakeID }}" class="btn btn-success btn-sm">Edit</router-link>         
                            <button @click.prevent="deleteIntake(intake.intakeID)" class="btn btn-danger btn-sm">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data() {
            return {
                Intakes: []
            }
        },
        created() {
            let apiURL = 'http://localhost:3000/intakes';       // uses GET endpoint to retrieve the data and insert it into the intake table
            axios.get(apiURL).then(res => {
                this.Intakes = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteIntake(id){
                let apiURL = `http://localhost:3000/intake/${id}`;                      // takes the intakeID from the selected intake and passes it to url so it can be deleted
                let indexOfArrayItem = this.Intakes.findIndex(i => i._id === id);
                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Intakes.splice(indexOfArrayItem, 1);
                    }).then(() => {
                        alert('Form was Deleted')
                        window.location.reload()
                    })
                }
            }
        }
    }
</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>