const Header = () => {
  return (
    /*html*/
    `
<nav class="navbar navbar-expand-lg bg-body-tertiary shadow ">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarTogglerDemo01">
      <a class="navbar-brand ps-lg-5 " style="font-weight:700;font-size:25px" href="#">NIKE</a>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
       
      </ul>
      <form class="d-flex pe-lg-5" role="search">
       <ul class=" navbar-nav me-auto mb-2 mb-lg-0" style="font-size:20px"> <li class="nav-item">
          <a class="nav-link " aria-current="page" href="/">HOME</a>
        </li>
        <li class="nav-item">
          <a class="nav-link " href="/about">ABOUT</a>
        </li>
        <li class="nav-item">
          <a class="nav-link "  href='/bills'>BILL</a>
        </li>
         <li class="nav-item">
          <a class="nav-link " href='/cart'>
 

<i class="fa-solid fa-cart-shopping"></i></a>
        </li></ul>
      </form>
    </div>
  </div>
</nav>
    `
  );
};
export default Header;
