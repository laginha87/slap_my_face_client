
export const Link: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...attrs }) => {
  return <a {...attrs} className='underline hover:text-gray-500'>{children}</a>
}
