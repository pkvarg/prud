import { Helmet } from 'react-helmet'
import React from 'react'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Prúd',
  description: 'Prinášať bohatstvo Božieho slova celému Božiemu ľudu',
  keywords:
    'kresťanské knihy, kresťanská literatúra, duchovné knihy, duchovná literatúra, Boh, Trojjediný Boh, Kristus, Ježiš Kristus, Duch, Duch Svätý, Život, Štúdium života, Biblia, Svätá Biblia, Štúdium Biblie, Písmo, Sväté Písmo, kresťanstvo, kresťania, cirkev, Cirkev, miestna cirkev, miestne cirkvy',
}

export default Meta
