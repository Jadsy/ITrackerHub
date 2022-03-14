<template>
    <div class="home">
        <section class="hero">
            <div class="hero-text container">
                <h1>Welcome "Name"</h1>
            </div>
        </section>
        <section>
            <p></p>
        </section>
        
    </div>
</template>

<script>


</script>

<style>
/* h1{
    text-align: center;
    position: absolute;
    top: 35%;
    left: 20%;
    background: linear-gradient(90deg,#ff0000,#ffff00,#ff00f3,#0033ff,#ff00c4,#ff0000);
    background-size: 400%;
    font-size: 70px;
    font-family: sans-serif;
    font-weight: 600;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    animation: animate 10s linear infinite;
}
@keyframes animate{
    0%{
        background-position: 0%;
    }
    100%{
        background-position: 400%;
    }
} */
.home{
    width: 100%;
    height: 100vh;
    color: #fff;
    background: linear-gradient(-45deg, #EE7752,#E73C7E,#23A6D5,#23D5AB);
    background-size: 400% 400%;
    animation: change 10s ease-in-out infinite;
}
h1{
    font-size: 5rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    border: 3px solid #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 5rem 10rem;
}

@keyframes change{
    0%{
        background-position: 0 50%;
    }
    50%{
        background-position: 100% 50%;
    }
    100%{
        background-position: 0 50%;
    }
}
</style>