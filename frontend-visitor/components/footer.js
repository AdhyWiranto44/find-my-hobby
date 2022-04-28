export default function Footer() {
  return (
    <footer id="footer" class="bg-warning">
      <div class="container">
        <div class="row border-dark">
          <div class="col-md text-center py-3">
            <small class="mr-2">&#169; {new Date().getFullYear()}. Made with <a class="text-decoration-none text-dark" href="/login">&#10084;</a> By Adhy Wiranto</small>
          </div>
        </div>
      </div>
    </footer>
  );
}