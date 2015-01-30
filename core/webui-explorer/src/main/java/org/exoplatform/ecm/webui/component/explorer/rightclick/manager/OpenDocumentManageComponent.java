package org.exoplatform.ecm.webui.component.explorer.rightclick.manager;

import org.exoplatform.ecm.webui.component.explorer.control.filter.IsDocumentFilter;
import org.exoplatform.ecm.webui.component.explorer.control.filter.IsNotTrashHomeNodeFilter;
import org.exoplatform.ecm.webui.component.explorer.control.filter.IsNotInTrashFilter;
import org.exoplatform.ecm.webui.component.explorer.control.filter.IsNotEditingDocumentFilter;

import org.exoplatform.ecm.webui.component.explorer.control.filter.IsNotFolderChildFilter;
import org.exoplatform.ecm.webui.component.explorer.control.listener.UIActionBarActionListener;
import org.exoplatform.webui.config.annotation.ComponentConfig;
import org.exoplatform.webui.config.annotation.EventConfig;
import org.exoplatform.webui.event.Event;
import org.exoplatform.webui.ext.filter.UIExtensionFilter;
import org.exoplatform.webui.ext.filter.UIExtensionFilters;
import org.exoplatform.webui.ext.manager.UIAbstractManager;
import org.exoplatform.webui.ext.manager.UIAbstractManagerComponent;

import java.util.Arrays;
import java.util.List;

/**
 * Created by toannh on 11/26/14.
 * Filter files can be open by Office or OS
 */
@ComponentConfig(
        events = {
                @EventConfig(listeners = OpenDocumentManageComponent.OpenDocumentActionListener.class)
        })
public class OpenDocumentManageComponent extends UIAbstractManagerComponent {

  private static final List<UIExtensionFilter> FILTERS = Arrays.asList(new UIExtensionFilter[] {
          new IsNotTrashHomeNodeFilter(),
          new IsNotInTrashFilter(),
          new IsDocumentFilter(),
          new IsNotEditingDocumentFilter(),
          new IsNotFolderChildFilter()});

  @UIExtensionFilters
  public List<UIExtensionFilter> getFilters() {
    return FILTERS;
  }

  public static class OpenDocumentActionListener extends UIActionBarActionListener<OpenDocumentManageComponent> {
    public void processEvent(Event<OpenDocumentManageComponent> event) throws Exception {
      System.out.println("ok");
      
    }
  }

  @Override
  public Class<? extends UIAbstractManager> getUIAbstractManagerClass() {
    return null;
  }

}
