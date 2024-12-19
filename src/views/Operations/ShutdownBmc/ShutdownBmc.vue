<template>
  <b-container fluid="xl">
    <page-title />
    <b-row>
      <b-col md="8" lg="8" xl="6">
        <page-section>
          <b-row>
            <b-col>
              <dl>
                <dt>
                  {{ $t('pageShutdownBmc.lastShutdown') }}
                </dt>
                <dd v-if="lastShutdownTime">
                  {{ $filters.formatDate(lastShutdownTime) }}
                  {{ $filters.formatTime(lastShutdownTime) }}
                </dd>
                <dd v-else>--</dd>
              </dl>
            </b-col>
          </b-row>
          {{ $t('pageShutdownBmc.shutdownInformation') }}
          <b-button
            variant="primary"
            class="d-block mt-5"
            data-test-id="shutdown-button"
            @click="onClick"
          >
            {{ $t('pageShutdownBmc.shutdownBmc') }}
          </b-button>
        </page-section>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import PageTitle from '@/components/Global/PageTitle';
import PageSection from '@/components/Global/PageSection';
import BVToastMixin from '@/components/Mixins/BVToastMixin';
import LoadingBarMixin from '@/components/Mixins/LoadingBarMixin';
import { useI18n } from 'vue-i18n';
import i18n from '@/i18n';

export default {
  name: 'ShutdownBmc',
  components: { PageTitle, PageSection },
  mixins: [BVToastMixin, LoadingBarMixin],
  beforeRouteLeave(to, from, next) {
    this.hideLoader();
    next();
  },
  data() {
    return {
      $t: useI18n().t,
    };
  },
  computed: {
    lastShutdownTime() {
      return this.$store.getters['controls/lastShutdownTime'];
    },
  },
  created() {
    this.startLoader();
    this.$store
      .dispatch('controls/getLastShutdownTime')
      .finally(() => this.endLoader());
  },
  methods: {
    onClick() {
      this.$bvModal
        .msgBoxConfirm(i18n.global.t('pageShutdownBmc.modal.confirmMessage'), {
          title: i18n.global.t('pageShutdownBmc.modal.confirmTitle'),
          okTitle: i18n.global.t('global.action.confirm'),
          cancelTitle: i18n.global.t('global.action.cancel'),
          autoFocusButton: 'ok',
        })
        .then((confirmed) => {
          if (confirmed) this.shutdownBmc();
        });
    },
    shutdownBmc() {
      this.$store
        .dispatch('controls/shutdownBmc')
        .then((message) => this.successToast(message))
        .catch(({ message }) => this.errorToast(message));
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/bmc/helpers/_index.scss';
@import '@/assets/styles/bootstrap/_helpers.scss';
</style>
