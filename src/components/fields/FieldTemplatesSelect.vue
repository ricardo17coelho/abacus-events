<template>
  <v-item-group v-model="model" return-object selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="12" sm="6">
          <v-item v-slot="{ toggle, isSelected }" :value="item">
            <v-card
              :color="isSelected ? 'primary' : undefined"
              height="100%"
              :title="item.title"
              :variant="isSelected ? 'outlined' : 'flat'"
              @click="toggle"
            >
              <template #append>
                <v-icon
                  class="opacity-20"
                  color="primary"
                  :icon="item.icon"
                  size="48"
                />
              </template>
              <v-card-item class="pt-4" height="64"> </v-card-item>
              <v-card-text>
                <div class="mx-2">{{ item.description }}</div>
              </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const model = defineModel({ type: Object, default: () => ({}) });
</script>
