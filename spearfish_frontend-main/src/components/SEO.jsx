import { Helmet } from "react-helmet-async";

/**
 * @method SEO component
 * @param {String} title the title of the page
 * @param {String} description the description of the page for SEO purposes 
 * @returns {JSX} header seo content
 */
const SEO = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={`${description}`} />
    </Helmet>
  )
}

export default SEO;
