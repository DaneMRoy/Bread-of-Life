<template>
    <div class="row">
        <h3> Distributions </h3>
        <router-link :to="{name: 'distCreate'} " class="btn btn-success">Add Distribution</router-link>
        <div class="col-md-12">
            <table class="table table-striped"> 
                <thead class="thead-dark">
                    <tr>
                        <th>Distribution ID</th> <!-- This code allows the table labels to be shown with the matching fields from the api  -->
                        <th>Location</th>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="dist in Dists" :key="dist._id">
                        <td>{{ dist.distID }}</td>
                        <td>{{ dist.location }}</td>
                        <td>{{ dist.date }}</td>
                        <td>{{ dist.type }}</td>
                        <td>
                            <router-link :to="{name: 'distEdit', params: { id: dist.distID }}" class="btn btn-success">Edit</router-link>       <!-- Edit button that takes you to Dist_Edit component -->                            <router-link :to="{name: 'distReport', params: { id: dist.distID }}" class="btn btn-primary">Report</router-link>
                            <button @click.prevent="deleteDist(dist.distID)" class="btn btn-danger">Delete</button>     <!-- Delete button that uses the deleteDist method to delete the record-->
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
                Dists: []
            }
            
        },
        created() {
            let apiURL = 'http://localhost:3000/dists';     // uses the GET enpoint to display information in the table
            axios.get(apiURL).then(res => {
                this.Dists = res.data;
            }).catch(error => {
                console.log(error)
            });
        },
        methods: {
            deleteDist(id){
                let apiURL = `http://localhost:3000/dist/${id}`; // Params the ID from the list view to the delete endpoint
                let indexOfArrayItem = this.Dists.findIndex(i => i._id === id);

                if (window.confirm("Do you really want to delete?")) {
                    axios.delete(apiURL).then(() => {
                        this.Dists.splice(indexOfArrayItem, 1);
                    }).then(() => {
                        alert('Form was Deleted') // Allows a pop up window to confirm that the ID was deleted 
                        window.location.reload() // Allows the page to reload after the delete button is pressed 
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
