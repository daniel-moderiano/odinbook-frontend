import GithubIcon from './icons/GithubIcon';

const SideFooter = () => {
  return (
    <footer className='flex flex-col w-[350px] fixed'>
      <div className="flex flex-col items-center border border-gray-300/80 rounded-md py-4">
        <h2 className="font-semibold text-2xl text-gray-600 mb-0.5">odinbook</h2>
        <p className="text-sm text-gray-500 mb-0.5">&copy; Daniel Moderiano 2022</p>
        <a href="https://github.com" className="outline-gray-500" aria-label="View source code on Github" target="_blank" rel="noreferrer">
          <GithubIcon iconFill="#1f2937" iconStyles="w-8 p-1 opacity-60 hover:opacity-100" />
        </a>
      </div>
    </footer>
  )
}

export default SideFooter;