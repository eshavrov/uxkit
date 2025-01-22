import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';


export const devServer: DevServerConfiguration = {
  historyApiFallback: true, // Apply HTML5 History API if routes are used
  open: true,
  allowedHosts: 'all',
  hot: true, // Reload the page after changes saved (HotModuleReplacementPlugin)
  client: {
    // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    overlay: false,
    progress: true, // Prints compilation progress in percentage in the browser.
  },

  port: 4321,
  /**
   * Writes files to output path (default: false)
   * Build dir is not cleared using <output: {clean:true}>
   * To resolve should use FileManager
   */
  devMiddleware: {
    writeToDisk: true,
  },
};
