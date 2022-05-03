<template>
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">Projects Table</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="projectHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">Doing</a-radio-button>
						<a-radio-button value="stores">Done</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>


		<a-table :columns="columns" :data-source="data" :pagination="true">
			<template slot="prj" slot-scope="prj">
				<div class="table-avatar-info">
					
					<div class="avatar-info">
						<h6>{{ prj.pjname }}</h6>
						<p>{{ prj.name }}</p>
					</div>
				</div>
			</template>

			<template slot="added" slot-scope="added">
				<div class="prj-info">
					<h6 class="m-0">{{ added.job }}</h6>
					<p class="m-0 font-regular text-muted">{{ added.department }}</p>
				</div>
			</template>

			<template slot="status" slot-scope="status">
				<a-tag class="tag-status" :class="status ? 'ant-tag-primary' : 'ant-tag-muted'">
					{{ status ? "Doing" : "Done" }}
				</a-tag>
			</template>

			<template slot="val" slot-scope="val">
				<div class="val-info">
					<h6 class="m-0">{{ val }}</h6>
				</div>
			</template>

		</a-table>
	</a-card>
</template>



<script>
	const columns = [
		{
			title: '',
			dataIndex: '',
			scopedSlots: { },
		},
		{
			title: 'Project',
			dataIndex: 'prj',
			scopedSlots: { customRender: 'prj' },
		},
		{
			title: 'Added by',
			dataIndex: 'added',
			scopedSlots: { customRender: 'added' },
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			scopedSlots: { customRender: 'status' },
		},
		{
			title: 'Value',
			dataIndex: 'val',
			class: 'val',
		},
	];

	const data = [
		{
			key: '1',
			prj: {
				pjname: 'Project1',
				name: 'Michael John',
				
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 1,
			val: '100,000',
		},
		{
			key: '2',
			prj: {
				
				name: 'Alexa Liras',
				pjname: 'Project2',
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 0,
			val: '100,000',
		},
		{
			key: '3',
			prj: {
				
				name: 'Laure Perrier',
				pjname: 'Project3',
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 1,
			val: '100,000',
		},
		{
			key: '4',
			prj: {
				
				name: 'Miriam Eric',
				pjname: 'Project4',
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 1,
			val: '100,000',
		},
		{
			key: '5',
			prj: {
				
				name: 'Richard Gran',
				pjname: 'Project5',
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 0,
			val: '100,000',
		},
		{
			key: '6',
			prj: {
				
				name: 'John Levi',
				pjname: 'Project6',
			},
			added: {
				job: 'Mr. Seller',
				department: 'Admin',
			},
			status: 0,
			val: '100,000',
		},
	];

	export default {
		data() {
			return {
				data,
				columns,
			};
		},
	};
</script>