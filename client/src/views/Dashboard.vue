<!-- 
	This is the dashboard page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Counter Widgets -->
		<!-- Charts -->
		<a-row :gutter="24" type="flex" align="stretch">
			<a-col :span="24" :lg="6" class="mb-24">

				<!-- Active Users Card -->
				<!-- <CardBarChart></CardBarChart> -->
				<CardUser></CardUser>
				<!-- Active Users Card -->

			</a-col>
			<a-col :span="24" :lg="6" class="mb-24">

				<!-- Active Users Card -->
				<!-- <CardBarChart></CardBarChart> -->
				<CardBank></CardBank>
				<!-- Active Users Card -->

			</a-col>
			<a-col :span="24" :lg="12" class="mb-24">
				
				<!-- Sales Overview Card -->
				<CardCompanyStat></CardCompanyStat>
				<!-- / Sales Overview Card -->

			</a-col>
		</a-row>
		<!-- / Charts -->

		<!-- Table & Timeline -->
		<a-row :gutter="24" type="flex" align="stretch">
			<!-- Table -->
			<a-col :span="24" :lg="16" class="mb-24">
				
				<!-- Projects Table Card -->
				<CardProjectTable
					:data="tableData"
					:columns="tableColumns"
				></CardProjectTable>
				<!-- / Projects Table Card -->
				
			</a-col>
			<!-- / Table -->

			<!-- Timeline -->
			<a-col :span="24" :lg="8" class="mb-24">

				<!-- Orders History Timeline Card -->
				<CardCustomerAnalytic></CardCustomerAnalytic>
				<!-- / Orders History Timeline Card -->

			</a-col>
			<!-- / Timeline -->
		</a-row>
		<!-- / Table & Timeline -->

	</div>
</template>

<script>



	// "Projects" table component.
	import CardProjectTable from '../components/Cards/CardProjectTable' ;
	
	// Card Current User .
	import CardUser from '../components/Cards/CardUser.vue'
	
	// Card crrent Bank
	import CardBank from '../components/Cards/CardBank.vue'

	// Card Company Stat
	import CardCompanyStat from '../components/Cards/CardCompanyStat.vue'

	// card customer a alytic
	import CardCustomerAnalytic from '../components/Cards/CardCustomerAnalytic.vue'

	export default ({
		components: {



			CardProjectTable,
			CardUser,
			CardBank,
			CardCompanyStat,
			CardCustomerAnalytic,
		},
		data() {
			return {

				// Associating table data with its corresponding property.
				tableData,

				// Associating table columns with its corresponding property.
				tableColumns,

				// Counter Widgets Stats
				stats,
			}
		},
	})

</script>

<style scoped>
	
</style>