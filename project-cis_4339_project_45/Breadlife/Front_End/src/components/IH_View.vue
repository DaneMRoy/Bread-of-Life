<template>

    <div class="row">
        <h3> Intake History </h3> <!--This is the view for the intake history based on the intake ID   -->
        <div class="col-md-12">
            <table class="table table-striped"> 
                <thead class="thead-dark"> 
                    <tr>
                        <th>intakeID</th> 
                        <th>distID</th>
                        <th>type</th>
                        <th>date</th>  
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="ih in IntakeHistory" :key="ih.intakeID">     <!-- prints data in the intake history table -->
                        <td>{{ ih.intakeID }}</td>
                        <td>{{ ih.distID }}</td>
                        <td>{{ ih.type }}</td>
                        <td>{{ ih.date }}</td>
                        <td>
                            <button @click.prevent="deleteIH(ih._id)" class="btn btn-danger">Delete</button> <!-- the delete button will allow intake history's to be deleted   -->
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
                IntakeHistory: []
            }
        },
        created() {
            let apiURL = `http://localhost:3000/ih_by_intakeid/${this.$route.params.id}`; // this code allows the intakeID to be moved over from the intake view and then populate the specific history table 
            axios.get(apiURL).then(res => {
                this.IntakeHistory = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteIH(id){
                let apiURL = `http://localhost:3000/del_ih/${id}`; // this code uses the api endpoint to delete by using the intake ID in the list view 
                let indexOfArrayItem = this.IntakeHistory.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.IntakeHistory.splice(indexOfArrayItem, 1);
                    }).then(() => {
                        alert('Form was Deleted')
                        window.location.reload() // reloads window after delete had been performed to reflect changes
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