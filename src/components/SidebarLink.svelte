<script>
    /** @type {string} FontAwesome icon */
    export let icon;
    /** @type {string} Link label */
    export let label;
    /** @type {string} Link destination */
    export let href;
</script>

<li class="nav-item">
    <a {href} class="nav-link">
        <i class="nav-icon {icon} text-primary" />
        <p>{label}</p>
    </a>
</li>
