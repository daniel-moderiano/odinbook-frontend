import GithubIcon from "./icons/GithubIcon"

const Footer = () => {
  return (
    <footer className='flex flex-col items-center rounded-md pb-3 pt-2'>
      <h2 className="font-semibold text-xl text-gray-600 mb-0.5">odinbook</h2>
      <p className="text-sm text-gray-500 mb-0.5">&copy; Daniel Moderiano 2022</p>
      <a href="https://github.com" className="outline-gray-500" target="_blank" rel="noreferrer" aria-label="View source code on Github">
        <GithubIcon iconFill="#1f2937" iconStyles="w-8 p-1 opacity-60 hover:opacity-100" />
      </a>
  </footer>
  )
}

export default Footer;