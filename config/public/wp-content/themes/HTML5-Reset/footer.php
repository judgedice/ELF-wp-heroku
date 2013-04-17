		<footer id="footer" class="source-org vcard copyright">
			<small>&copy;<?php echo date("Y"); echo " "; bloginfo('name'); ?></small>
		</footer>

	</div>

	<?php wp_footer(); ?>


<!-- here comes the javascript -->

<!-- jQuery is called via the Wordpress-friendly way via functions.php -->

<!-- this is where we put our custom functions -->
<script type="text/javascript" src="lib/paper.js"></script>
<script type="text/paperscript" src="<?php bloginfo('template_directory'); ?>/_/js/functions.js" canvas="shapeCanvas"></script>


<!--[if lt IE 7 ]>
<script src="<?php bloginfo('template_directory'); ?>/_/js/jquery.corners.js"></script>
<script type="text/javascript">
$('.r-tr').corner('50px tr');
$('.r-tl').corner('50px tl');
$('.r-br').corner('50px br');
$('.r-bl').corner('50px bl');
</script>
<![endif]-->

	
</body>

</html>
