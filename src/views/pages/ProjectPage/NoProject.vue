<template>
    <v-container>
        <v-row>
        <v-col cols="12" class="text-center">
            <h1>You have no projects</h1>
            <v-btn class="success mx-0 mt-3" @click="$router.push('/CreateProject')">
            <v-icon align-self="left">mdi-plus-minus</v-icon>
            Create Project
            </v-btn>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {}
</script>

<style>
</style>