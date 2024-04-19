import styles from './styles.module.css'
const Categories = ({ categories, setSelectedCategory, selectedCategory }) => {
	return (
		<div className={styles.categories}>
			<button
				onClick={() => setSelectedCategory(null)}
				className={`${styles.item} ${!selectedCategory ? styles.active : ''}`}
			>
				All
			</button>
			{categories.map(category => {
				return (
					<button
						onClick={() => setSelectedCategory(category)}
						className={`${styles.item} ${
							selectedCategory === category ? styles.active : ''
						}`}
						key={category}
					>
						{category}
					</button>
				)
			})}
		</div>
	)
}

export default Categories
