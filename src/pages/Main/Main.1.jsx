import { useState } from 'react'
import { getCategories, getNews } from '../../api/apiNews'
import Categories from '../../components/Categories/Categories'
import NewsBanner from '../../components/NewsBanner/NewsBanner'
import NewsList from '../../components/NewsList/NewsList'
import Pagination from '../../components/Pagination/Pagination'
import Search from '../../components/Search/Search'
import { PAGE_SIZE, TOTAL_PAGES } from '../../constants/constants'
import { useDebounce } from '../../helpers/hooks/useDebounce'
import { useFetch } from '../../helpers/hooks/useFetch'
import styles from './styles.module.css'

export const Main = () => {
	const [filters, setFilters] = useState({
		page_number: 1,
		page_size: PAGE_SIZE,
		category: null,
		keywords: '',
	})

	const changeFilter = (key, value) => {
		setFilters(prev => {
			return { ...prev, [key]: value }
		})
	}

	const [currentPage, setCurrentPage] = useState(1)
	const [selectedCategory, setSelectedCategory] = useState('All')
	const [keywords, setKeywords] = useState('')

	const debouncedKeywords = useDebounce(keywords, 1500)

	const { data, error, isLoading } = useFetch(getNews, {
		page_number: currentPage,
		page_size: PAGE_SIZE,
		category: selectedCategory === 'All' ? null : selectedCategory,
		keywords: debouncedKeywords,
	})

	const { data: dataCategories } = useFetch(getCategories)

	const handleNextPage = () => {
		if (currentPage < TOTAL_PAGES) {
			setCurrentPage(currentPage + 1)
		}
	}
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}
	const handlePageClick = pageNumber => {
		setCurrentPage(pageNumber)
	}
	return (
		<main className={styles.main}>
			{dataCategories ? (
				<Categories
					categories={dataCategories.categories}
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
			) : null}
			<Search keywords={keywords} setKeywords={setKeywords} />

			<NewsBanner
				isLoading={isLoading}
				item={data && data.news && data.news[0]}
			/>

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={TOTAL_PAGES}
				currentPage={currentPage}
			/>
			<NewsList isLoading={isLoading} news={data?.news} />

			<Pagination
				handleNextPage={handleNextPage}
				handlePreviousPage={handlePreviousPage}
				handlePageClick={handlePageClick}
				totalPages={TOTAL_PAGES}
				currentPage={currentPage}
			/>
		</main>
	)
}
