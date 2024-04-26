import withSkeleton from '../../helpers/hocs/withSkeleton'
import NewsBanner from '../NewsBanner/NewsBanner'
import styles from './styles.module.css'

const BannersList = ({ banners }) => {
	return (
		<ul className={styles.banners}>
			{banners?.slice(0, 3).map((banner, index) => {
				return <NewsBanner key={banner.id} item={banner} />
			})}
		</ul>
	)
}

const BannersListWithSkeleton = withSkeleton(BannersList, 'banner', 3, 'row')

export default BannersListWithSkeleton
