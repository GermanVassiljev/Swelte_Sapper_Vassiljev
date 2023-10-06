<script context="module">
    export async function preload({ params }, { user }) {
        if (user) {
            this.redirect(302, `/`);
        }
    }
</script>
<script>
    import { goto, stores } from '@sapper/app';
    import { post } from 'utils.js';

    const { session } = stores();
    let username = '';
    let password = '';
    let error = null;

    async function submit(event) {
        const response = await post(`auth/login`, { username, password });
        error = response.error;
        console.log(response);
        if (response.token) {
            $session.token = response.token;
            goto('/');
        }
    }
</script>

<svelte:head>
    <title>Sign in • TARpv21 group</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign In</h1>
                <p class="text-xs-center">
                    <a href="/register">Need an account?</a>
                </p>

                {#if error}<div class="alert alert-danger" role="alert">{error}</div>{/if}
                <form on:submit|preventDefault={submit}>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Username" bind:value={username}>
                    </fieldset><br/>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" required placeholder="Password" bind:value={password}>
                    </fieldset><br/>
                    <button class="btn btn-lg btn-primary pull-xs-right" type="submit">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</div>